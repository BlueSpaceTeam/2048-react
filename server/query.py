'''
Author: fantiga
Date: 2022-06-02 18:05:59
LastEditTime: 2022-06-04 14:25:24
LastEditors: fantiga
Description: 
FilePath: /2048-react/server/query.py
'''

from flask import Flask, request
import os
import sqlite3
import time

app = Flask(__name__)


class Db():
    def __init__(self) -> None:
        # 数据库文件
        self.db_file = 'db.sqlite3'
        self.db = os.path.join(os.path.dirname(__file__), self.db_file)
        # 连接到SQLite数据库
        # 如果文件不存在，会自动在当前目录创建
        self.conn = sqlite3.connect(self.db)
        # 创建一个Cursor
        self.cur = self.conn.cursor()

    # 插入记录并返回新id
    def insertTableData(self, sql):
        self.cur.execute(sql)
        lastrowid = self.cur.lastrowid
        self.conn.commit()
        return lastrowid

    # 查询并返回记录
    def selectTableData(self, sql):
        self.cur.execute(sql)
        self.conn.commit()
        # 数据集
        get_table_data = self.cur.fetchall()
        # 表结构
        get_table_fields = self.cur.description
        return [get_table_fields, get_table_data]

    # 关闭数据库
    def closeDatabase(self):
        self.cur.close()
        self.conn.close()


@app.route('/query', methods=['POST'])
def query():
    # 接收到的数据
    user_name = request.form['user_name']
    user_score = int(request.form['user_score'])

    now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    db = Db()

    # 拼接sql语句
    sql = 'INSERT INTO "main"."bs_2048_server_rankdata" ("user_name", "user_score", "created_time") VALUES("' + \
        user_name + '", ' + str(user_score) + ', "' + now + '")'

    # 最新的id
    lastrowid = db.insertTableData(sql)

    # 保存当前的记录数据
    current_data = {
        "id": lastrowid,
        "user_name": user_name,
        "user_score": user_score,
        "created_time": now
    }

    # 拼接sql语句
    sql = 'SELECT id, user_name, user_score, created_time from "main"."bs_2048_server_rankdata" ORDER BY "user_score" DESC LIMIT 10'
    fields, fetch_data = db.selectTableData(sql)

    # 定义表结构的列表
    column_list = []

    # 提取字段，追加到列表中
    for i in fields:
        column_list.append(i[0])

    # 按行将数据存入数组中，并转换为json格式
    #column_size = len(column_list)
    # 定义存储sql数据的list
    sql_list = []
    # 按行对sql数据进行循环
    for row in fetch_data:
        # 表数据与表结构对应 存入字典中
        result = {}
        for i in range(len(row)):
            result[column_list[i]] = row[i]
        # 字典存入list中
        sql_list.append(result)

    json = {
        "current_data": current_data,
        "rank_data": sql_list
    }

    db.closeDatabase()

    return json


if __name__ == '__main__':
    app.run(debug=True)
