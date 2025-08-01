const AWS = require('aws-sdk');

// Configure the region
AWS.config.update({ region: 'us-east-2' });

// Create DynamoDB and S3 service objects
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

// Function to scan DynamoDB, archive data to S3, and delete archived items
async function archiveAndDeleteData(tableName, bucketName, archiveDate) {
    const scanParams = {
        TableName: tableName,
        FilterExpression: '#date <= :val',
        ExpressionAttributeNames: {
            '#date': 'appointmentDate'
        },
        ExpressionAttributeValues: {
            ':val': archiveDate
        }
    };

    let items = [];
    let scanData;

    do {
        scanData = await dynamoDB.scan(scanParams).promise();
        items = items.concat(scanData.Items);
        scanParams.ExclusiveStartKey = scanData.LastEvaluatedKey;
    } while (typeof scanData.LastEvaluatedKey !== 'undefined');

    // Save the items to S3
    const s3Params = {
        Bucket: bucketName,
        Key: 'archive-' + new Date().toISOString() + '.json',
        Body: JSON.stringify(items),
        ContentType: 'application/json'
    };

    await s3.putObject(s3Params).promise();
    console.log(`Archived ${items.length} items to ${s3Params.Bucket}/${s3Params.Key}`);

    // Delete items from DynamoDB after successful archive
    for (const item of items) {
        const deleteParams = {
            TableName: tableName,
            Key: {
                id: item.id  // Make sure the key attribute(s) match your table's primary key configuration
            }
        };
        await dynamoDB.delete(deleteParams).promise();
        console.log(`Deleted item with ID: ${item.id}`);
    }
}

// Usage
archiveAndDeleteData('Trip-tqrvaiwlxzd4vikuuijafzaw4y-dev', 'archivedtripdata', '2024-02-29')
    .catch(console.error);
