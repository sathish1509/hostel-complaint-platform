/* MongoDB Playground */
// Use the 'hostel_platform' database
use('hostel_platform');

// Search for all students
console.log('--- Students ---');
db.getCollection('users').find({ role: 'student' }).forEach(printjson);

// Search for all wardens
console.log('--- Wardens ---');
db.getCollection('users').find({ role: 'warden' }).forEach(printjson);

// Search for all complaints
console.log('--- Complaints ---');
db.getCollection('complaints').find().forEach(printjson);
