'''
Author: fantiga
Date: 2022-06-02 18:05:59
LastEditTime: 2022-06-08 18:09:08
LastEditors: fantiga
Description:
FilePath: /2048-react/server/query.py
'''

from flask import Flask, request
import flask
import os
import sqlite3
import time
import json
from flask_cors import CORS

app = Flask(__name__)

"""
    跨域支持
 """
CORS(app, resources=r'/*')


headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
}

# app.config['CORS_HEADERS'] = 'Content-Type'


# def after_request(resp):
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     return resp


# app.after_request(after_request)

class Db():
    """
        用于操作数据库的封装
    """

    def __init__(self) -> None:
        # 数据库文件
        self.db_file = r'bs_2048.db'
        self.db = os.path.join(os.path.dirname(__file__), self.db_file)
        # 连接到SQLite数据库
        # 如果文件不存在，会自动在当前目录创建
        self.conn = sqlite3.connect(self.db)
        # 创建一个Cursor
        self.cur = self.conn.cursor()

    def insertTableData(self, sql):
        """
            插入记录并返回新id
        """
        self.cur.execute(sql)
        lastrowid = self.cur.lastrowid
        self.conn.commit()
        return lastrowid

    def selectTableData(self, sql):
        """
            查询并返回记录
        """
        self.cur.execute(sql)
        self.conn.commit()
        # 数据集
        get_table_data = self.cur.fetchall()
        # 表结构
        get_table_fields = self.cur.description
        return [get_table_fields, get_table_data]

    def selectRankNum(self, sql):
        """
            查询并返回排名
        """
        self.cur.execute(sql)
        self.conn.commit()
        # 单条数据
        return self.cur.fetchone()

    def closeDatabase(self):
        """
            关闭数据库
        """
        self.cur.close()
        self.conn.close()


def getAll():
    """
        获取前10名
    """
    db = Db()
    # 拼接sql语句
    sql = "SELECT a.id, a.user_name, a.user_score, a.created_time FROM \"main\".\"bs_2048_server_rankdata\" a JOIN (SELECT * FROM \"main\".\"bs_2048_server_rankdata\" ORDER BY created_time DESC LIMIT 9999) b ON a.id=b.id GROUP BY a.user_score ORDER BY a.user_score DESC LIMIT 10"
    fields, fetch_data = db.selectTableData(sql)

    # 定义表结构的列表
    column_list = []

    # 提取字段，追加到列表中
    for i in fields:
        column_list.append(i[0])

    # 按行将数据存入数组中，并转换为json格式
    # column_size = len(column_list)
    # 定义存储sql数据的list
    sql_list = []
    # 按行对sql数据进行循环
    for rank_num, row in enumerate(fetch_data):
        # 表数据与表结构对应 存入字典中
        result = {}
        result['rank_num'] = rank_num + 1
        for i in range(len(row)):
            result[column_list[i]] = row[i]
        # 字典存入list中
        sql_list.append(result)

    db.closeDatabase()

    return sql_list


@app.route(r'/query', methods=['POST'])
def query():
    # 接收到的数据
    action = request.form['action']
    json_data = {}

    if action == 'add':
        user_name = request.form['user_name']
        user_score = int(request.form['user_score'])
        now = time.strftime(r"%Y-%m-%d %H:%M:%S", time.localtime())
        db = Db()

        # 拼接sql语句
        sql = "INSERT INTO \"main\".\"bs_2048_server_rankdata\" (\"user_name\", \"user_score\", \"created_time\") VALUES('" + \
            user_name + "', '" + str(user_score) + "', '" + now + "')"

        # 最新的id
        lastrowid = db.insertTableData(sql)

        # 获取排名值
        sql = "SELECT COUNT(*) FROM (SELECT * FROM \"main\".\"bs_2048_server_rankdata\" WHERE \"user_score\" > '" + \
            str(user_score) + "' GROUP BY user_score)"
        rank_num = db.selectRankNum(sql)

        db.closeDatabase()

        # 保存当前的记录数据
        current_data = {
            "id": lastrowid,
            "user_name": user_name,
            "user_score": user_score,
            "rank_num": rank_num[0] + 1,
            "created_time": now
        }

        json_data.update({
            "current_data": current_data
        })

    json_data.update({
        "rank_data": getAll()
    })

    rsp = flask.Response(json.dumps(json_data))
    rsp.headers = headers
    rsp.headers['Cache-Control'] = 'no-cache'
    return rsp


if __name__ == '__main__':
    app.run(debug=False)
