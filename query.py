'''
Author: fantiga
Date: 2022-06-02 18:05:59
LastEditTime: 2022-06-03 20:05:15
LastEditors: fantiga
Description: 
FilePath: /2048-react/query.py
'''

from flask import Flask, request
import os
import sqlite3

db_file = 'db.sqlite3'
app = Flask(__name__)


class Db():
    def __init__(self, db_file, insert_table_data, select_table_data) -> None:
        # 数据库文件
        self.db_file = db_file
        self.db = os.path.join(os.path.dirname(__file__), self.db_file)
        # 接收到的数据
        self.insert_table_data = insert_table_data
        self.select_table_data = select_table_data
        # 连接到SQLite数据库
        # 如果文件不存在，会自动在当前目录创建
        self.conn = sqlite3.connect(self.db)
        # 创建一个Cursor
        self.cur = self.conn.cursor()

    # 插入记录并返回新id
    def insertTableData(self):
        self.cur.execute(self.insert_table_data)
        lastrowid = self.cur.lastrowid
        self.conn.commit()
        return lastrowid

    # 查询并返回记录
    def selectTableData(self):
        self.cur.execute(self.select_table_data)
        self.conn.commit()
        get_table_data = self.cur.fetchall()
        return get_table_data

    # 关闭数据库
    def closeDatabase(self):
        self.cur.close()
        self.conn.close()


@app.route('/query', methods=['POST'])
def query():
    # 接收到的数据
    user_name = request.form['user_name']
    user_score = request.form['user_score']
    print(user_name, user_score)

    # 拼接sql语句
    insert_data_sql = 'INSERT INTO "main"."bs_2048_server_rankdata" ("user_name", "user_score") VALUES("' + \
        user_name + '", ' + user_score + ')'

    # 最新的id
    lastrowid = Db.insertTableData(insert_data_sql)
    Db.insertTableData(insert_data_sql)
    print('lastrowid', lastrowid)

    # 保存当前的记录数据
    current_data = {
        "id": lastrowid,
        "user_name": user_name,
        "user_score": user_score
    }

    # 拼接sql语句
    select_data_sql = 'SELECT id, user_name, user_score, created_time from "main"."bs_2048_server_rankdata" ORDER BY "user_score" DESC LIMIT 10'
    fetch_data = Db.selectTableData(select_data_sql)

    json = {
        "current_data": current_data,
        "rank_data": fetch_data
    }
    print('json', json)

    return json


if __name__ == '__main__':
    app.run(debug=True)
