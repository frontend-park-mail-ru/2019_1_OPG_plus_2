#!/usr/bin/env bash

ssh-keyscan -H $PRODUCTION_MACHINE_ADDRESS >> ~/.ssh/known_hosts
chmod 600 ./deploy_key_production
ssh -i ./deploy_key_production $PRODUCTION_MACHINE_USERNAME@$PRODUCTION_MACHINE_ADDRESS << EOF

cd front
git pull
echo Aquiring fresh version of repo...
git checkout travis-ci-cd && \
echo Pulling changes... && git pull && \
echo Restarting service...
sudo systemctl restart colors-front && echo Successfully deployed!!!
exit
EOF
