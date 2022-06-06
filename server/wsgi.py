'''
Author: fantiga
Date: 2022-06-06 14:52:26
LastEditTime: 2022-06-06 16:10:23
LastEditors: fantiga
Description: 
FilePath: /2048-react/server/wsgi.py
'''

from query import app as application
import sys
sys.path.insert(0, "/var/www/ued.team/")

if __name__ == "__main__":
    application.run()
