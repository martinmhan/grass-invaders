const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
require('@babel/polyfill'); // enables async await in react code

configure({ adapter: new Adapter() });
