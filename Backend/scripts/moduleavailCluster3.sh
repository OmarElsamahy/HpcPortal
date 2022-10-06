#!/bin/bash
sshpass -p 'Iri@2022' autossh -o StrictHostKeyChecking=no pbsdata@172.30.0.121 "> moduleavailtxt;module avail > moduleavailtxt; cat moduleavailtxt"