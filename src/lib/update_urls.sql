-- Update image URLs to new bucket
UPDATE pants
SET image_url = REPLACE(
    image_url,
    'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com',
    'https://react-atx-demo-bucket.s3.us-east-1.amazonaws.com'
); 