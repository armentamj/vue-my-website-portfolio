#!/bin/sh

/pb/pocketbase migrate
if [ -n "$UB_ADMIN_EMAIL" ] && [ -n "$UB_ADMIN_PASSWORD" ]; then
    /pb/pocketbase superuser upsert ${UB_ADMIN_EMAIL} ${UB_ADMIN_PASSWORD}
fi
/pb/pocketbase serve --http=0.0.0.0:8090