const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run()   {
    // Get the inputs from the workflow file
    const bucket = core.getInput('bucket', {required: true});
    const bucketRegion = core.getInput('bucket-region', {required: false});
    const dir = core.getInput('dist-dir', {required: false});
    // Upload the files
    const s3Uri = `s3://${bucket}`;
    core.notice(`Uploading files from ${dir} to ${s3Uri} in ${bucketRegion}`);
    exec.exec(`aws s3 sync ${dir} ${s3Uri} --region ${bucketRegion}`);    
}

run();