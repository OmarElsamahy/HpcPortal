#!/bin/bash
sshpass -p 'Iri@2022' autossh -o StrictHostKeyChecking=no pbsdata@192.168.15.201 "pbsnodes -aSjv"