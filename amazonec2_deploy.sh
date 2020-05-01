#!/bin/bash

# ports needed: 80, 81, 3000, 9090, 9100, 27017

docker-machine create                                               \
    --driver amazonec2                                              \
    --amazonec2-region eu-west-2                                    \
    --amazonec2-open-port 80                                        \
    --amazonec2-open-port 81                                        \
    --amazonec2-open-port 3000                                      \
    --amazonec2-open-port 9090                                      \
    --amazonec2-open-port 9100                                      \
    --amazonec2-open-port 27017                                     \
    --amazonec2-access-key TODO                                     \
    --amazonec2-secret-key TODO                                     \
    idp-container-1

