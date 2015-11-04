#!/bin/bash

set -e

cd /hackpad

mkdir -p ./etherpad/data/logs/frontend
mkdir -p ./etherpad/data/logs/backend

cp etherpad/etc/etherpad.local.properties.tmpl etherpad/etc/etherpad.local.properties

sed 's:etherpad.isProduction = true:etherpad.isProduction = false:'     -i'' etherpad/etc/etherpad.local.properties
sed 's:__default_id_encryption_key__:0123456789abcdef:'                 -i'' etherpad/etc/etherpad.local.properties
sed 's:__account_id_encryption_key__:0123456789abcdef:'                 -i'' etherpad/etc/etherpad.local.properties
sed 's:__collection_id_encryption_key__:0123456789abcdef:'              -i'' etherpad/etc/etherpad.local.properties
sed 's:theme = default:theme = spikeekips:'                             -i'' etherpad/etc/etherpad.local.properties
sed 's:__welcome_pad_source_id__:WELCOMEPAD:'                           -i'' etherpad/etc/etherpad.local.properties
sed 's:__feature_help_pad_source_id__:FEATUREHELPPAD:'                  -i'' etherpad/etc/etherpad.local.properties
sed 's:logDir = .*:logDir = ./data/logs:'                               -i'' etherpad/etc/etherpad.local.properties
#sed 's:listen = 9000:listen = 80:'                                      -i'' etherpad/etc/etherpad.local.properties
#sed 's:solrHostPort = 127.0.0.1\:9000:solrHostPort = 127.0.0.1\:80:'    -i'' etherpad/etc/etherpad.local.properties

[ -z "${HACKPAD_DOMAIN}" ]                            || sed "s:topdomains = localhost,localhost.localdomain:topdomains = ${HACKPAD_DOMAIN}:"        -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_AWS_REGION}" ]                        || sed "s:s3Region = us-east-1:s3Region = ${HACKPAD_AWS_REGION}:"                              -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_EMAIL_ADDRESSES_WITH_ADMIN_ACCESS}" ] || sed "s:__email_addresses_with_admin_access__:${HACKPAD_EMAIL_ADDRESSES_WITH_ADMIN_ACCESS}:" -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_DBC_DBSERVER}" ]                      || sed "s:__dbc_dbserver__:${HACKPAD_DBC_DBSERVER}:"                                           -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_DBC_DBPORT}" ]                        || sed "s:__dbc_dbport__:${HACKPAD_DBC_DBPORT}:"                                               -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_DBC_DBNAME}" ]                        || sed "s:__dbc_dbname__:${HACKPAD_DBC_DBNAME}:"                                               -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_DBC_DBPASS}" ]                        || sed "s:__dbc_dbpass__:${HACKPAD_DBC_DBPASS}:"                                               -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_DBC_DBUSER}" ]                        || sed "s:__dbc_dbuser__:${HACKPAD_DBC_DBUSER}:"                                               -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_SMTP_USER}" ]                         || sed "s:__smtp_user__:${HACKPAD_SMTP_USER}:"                                                 -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_SMTP_PASSWORD}" ]                     || sed "s:__smtp_password__:${HACKPAD_SMTP_PASSWORD}:"                                         -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_AWS_KEY_ID}" ]                        || sed "s:__aws_key_id__:${HACKPAD_AWS_KEY_ID}:"                                               -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_AWS_SECRET}" ]                        || sed "s:__aws_secret__:${HACKPAD_AWS_SECRET}:"                                               -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_AWS_ATTACHMENTS_BUCKET}" ]            || sed "s:__aws_attachments_bucket__:${HACKPAD_AWS_ATTACHMENTS_BUCKET}:"                       -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_SUPERUSER_EMAIL_ADDRESSES}" ]         || sed "s:__email_addresses_with_admin_access__:${HACKPAD_SUPERUSER_EMAIL_ADDRESSES}:"         -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_BRAND_NAME}" ]                        || sed "s:customBrandingName = .*:customBrandingName = ${HACKPAD_BRAND_NAME}:"                 -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_IS_PRODUCTION}" ]                     || sed "s:etherpad.fakeProduction = .*:etherpad.fakeProduction = ${HACKPAD_IS_PRODUCTION}:"    -i'' etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_DOMAIN}" ]                            || echo "etherpad.canonicalDomain = ${HACKPAD_DOMAIN}"    >> etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_SSOSCRIPT}" ]                         || echo "etherpad.SSOScript = ${HACKPAD_SSOSCRIPT}"       >> etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_VERBOSE}" ]                           || echo "verbose = ${HACKPAD_VERBOSE}"                    >> etherpad/etc/etherpad.local.properties
[ -z "${HACKPAD_SMTP_SERVER}" ]                       || echo "smtpServer = ${HACKPAD_SMTP_SERVER}"             >> etherpad/etc/etherpad.local.properties

sed "s:__location_after_signout__:${HACKPAD_LOCATION_AFTER_SIGNOUT}:"                       -i'' etherpad/etc/etherpad.local.properties

if [ -f /bootstrap.sh ];then
    bash /bootstrap.sh.sh
fi

./bin/run.sh $@

#vim: set tw=1000000000000:
