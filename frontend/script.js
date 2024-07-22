'use strict';
import API from './api.js';

const api =new API()


api.get('expenses').then(data =>console.log(data))