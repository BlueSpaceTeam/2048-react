'''
Author: fantiga
Date: 2022-06-06 14:52:26
LastEditTime: 2022-06-14 14:34:10
LastEditors: fantiga
Description: 
FilePath: /2048-react/server/wsgi.py
'''

from query import app as application
import sys
sys.path.insert(0, r"/var/www/2048.ued.team/")

if __name__ == "__main__":
    application.run()
