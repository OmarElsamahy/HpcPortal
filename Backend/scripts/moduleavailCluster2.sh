#!/bin/bash
sshpass -p 'Iri@2022' autossh -o StrictHostKeyChecking=no pbsdata@10.140.0.212 "> moduleavailtxt;module avail > moduleavailtxt; cat moduleavailtxt"