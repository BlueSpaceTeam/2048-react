'''
Author: fantiga
Date: 2022-06-06 14:52:26
LastEditTime: 2022-06-07 14:56:51
LastEditors: fantiga
Description: 
FilePath: /2048-react/server/wsgi.py
'''

from query import app as application
import sys
sys.path.insert(0, r"/var/www/ued.team/")

if __name__ == "__main__":
    application.run()
