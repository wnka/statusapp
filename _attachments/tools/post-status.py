#!/usr/bin/python

import base64
import httplib2
import json
import datetime

class UTC(datetime.tzinfo):
    """UTC"""
    def utcoffset(self, dt):
        return None
    def tzname(self, dt):
        return "UTC"
    def dst(self, dt):
        return None

utc = UTC()
now = datetime.datetime.utcnow()
now = now.replace(tzinfo=utc)
print now.astimezone(utc).strftime("%a %b %d %H:%M:%S %Z %Y")

username = "foo"
password = "bar"
urlLocal = "http://localhost:5984"
auth = base64.encodestring("%s:%s" % (username, password))

status = raw_input("> ")

params = {'text':status, 'isWork':'false', 'type':'status', 'created_at':now.strftime("%a %b %d %H:%M:%S %Z %Y")};
print params
h = httplib2.Http(".cache")
resp, content = h.request(urlLocal + "/statusapp", 
    "POST", body=json.dumps(params), 
    headers={'content-type':'application/json', 'Authorization': "Basic %s" % auth} )
print resp, "\n", content
