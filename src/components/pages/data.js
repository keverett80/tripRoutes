import React, { useState, useEffect } from 'react';
;
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import { listCustomers } from '../../graphql/queries';



export const customers  = API.graphql({ query: listCustomers });








