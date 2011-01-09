#!/usr/bin/python

import datetime

from couchdbkit import *

class UTC(datetime.tzinfo):
    """UTC"""
    def utcoffset(self, dt):
        return None
    def tzname(self, dt):
        return "UTC"
    def dst(self, dt):
        return None

class Status(Document):
    text = StringProperty()
    isWork = StringProperty()
    type = StringProperty()
    created_at = StringProperty()

utc = UTC()

username = "user"
password = "pass"
urlLocal = "localhost:5984"

server = Server(uri="http://{0}:{1}@{2}".format(username, password, urlLocal))
db = server.get_or_create_db("statusapp")

Status.set_db(db)

while(1):
    statusText = raw_input("> ")
    
    now = datetime.datetime.utcnow()
    now = now.replace(tzinfo=utc)

    status = Status(
        text = statusText,
        isWork = "false",
        type = "status",
        created_at = now.strftime("%a %b %d %H:%M:%S %Z %Y"))
    
    status.save()
