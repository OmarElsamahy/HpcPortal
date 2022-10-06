#!/bin/bash
var1=$(sshpass -p 'Iri@2022' autossh pbsdata@192.168.15.201 "> moduleavailtxt;module avail > moduleavailtxt; cat moduleavailtxt")
echo $var1