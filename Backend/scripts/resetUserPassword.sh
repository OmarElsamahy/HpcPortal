#!/bin/bash
sshpass -p 'Clu$ter#iri' autossh admin@192.168.15.204 "echo $1 | ipa user-mod $2 --password "