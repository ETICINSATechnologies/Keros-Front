#!/usr/bin/env bash
sshpass -p "${SSH_PASS}" ssh ${SSH_USER}@${SSH_HOST} "(cd /var/www/keros-dev/dist/; forever stop ../bin/www )"
sshpass -p "${SSH_PASS}" rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/dist $TRAVIS_BUILD_DIR/package* $TRAVIS_BUILD_DIR/bin ${SSH_USER}@${SSH_HOST}:/var/www/keros-dev
sshpass -p "${SSH_PASS}" ssh ${SSH_USER}@${SSH_HOST} "(cd /var/www/keros-dev; npm install )"
sshpass -p "${SSH_PASS}" ssh ${SSH_USER}@${SSH_HOST} "(cd /var/www/keros-dev/dist/; NODE_ENV=staging  forever start ../bin/www )"