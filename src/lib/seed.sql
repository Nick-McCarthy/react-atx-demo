-- Clear existing data
TRUNCATE TABLE pants;

-- Insert Red Pants (r1-r9)
INSERT INTO pants (name, price, image_url, description, sizes, stock, category) VALUES
('Classic Red Slim Fit', 89.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/red/r1.webp', 'Premium slim fit red pants for a bold statement', ARRAY['S', 'M', 'L', 'XL'], 15, 'red'),
('Red Relaxed Chinos', 79.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/red/r2.webp', 'Comfortable red chinos with a modern relaxed fit', ARRAY['S', 'M', 'L', 'XL'], 12, 'red'),
('Red Tailored Trousers', 129.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/red/r3.webp', 'Elegant red trousers for formal occasions', ARRAY['S', 'M', 'L', 'XL'], 8, 'red'),
('Red Cargo Pants', 69.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/red/r4.webp', 'Durable red cargo pants with multiple pockets', ARRAY['S', 'M', 'L', 'XL'], 20, 'red'),
('Red Denim Jeans', 99.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/red/r5.webp', 'Classic red denim jeans with modern styling', ARRAY['S', 'M', 'L', 'XL'], 10, 'red'),
('Red Linen Pants', 89.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/red/r6.webp', 'Lightweight red linen pants for summer', ARRAY['S', 'M', 'L', 'XL'], 7, 'red'),
('Red Wool Blend Pants', 119.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/red/r7.webp', 'Warm red wool blend pants for winter', ARRAY['S', 'M', 'L', 'XL'], 5, 'red'),
('Red Athletic Pants', 59.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/red/r8.webp', 'Comfortable red athletic pants for active lifestyle', ARRAY['S', 'M', 'L', 'XL'], 25, 'red'),
('Red Formal Trousers', 149.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/red/r9.webp', 'Premium red formal trousers for special occasions', ARRAY['S', 'M', 'L', 'XL'], 6, 'red');

-- Insert Blue Pants (b1-b9)
INSERT INTO pants (name, price, image_url, description, sizes, stock, category) VALUES
('Classic Blue Slim Fit', 89.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/blue/b1.webp', 'Premium slim fit blue pants for everyday wear', ARRAY['S', 'M', 'L', 'XL'], 18, 'blue'),
('Blue Relaxed Chinos', 79.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/blue/b2.webp', 'Comfortable blue chinos with a modern relaxed fit', ARRAY['S', 'M', 'L', 'XL'], 15, 'blue'),
('Blue Tailored Trousers', 129.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/blue/b3.webp', 'Elegant blue trousers for formal occasions', ARRAY['S', 'M', 'L', 'XL'], 10, 'blue'),
('Blue Cargo Pants', 69.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/blue/b4.webp', 'Durable blue cargo pants with multiple pockets', ARRAY['S', 'M', 'L', 'XL'], 22, 'blue'),
('Blue Denim Jeans', 99.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/blue/b5.webp', 'Classic blue denim jeans with modern styling', ARRAY['S', 'M', 'L', 'XL'], 30, 'blue'),
('Blue Linen Pants', 89.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/blue/b6.webp', 'Lightweight blue linen pants for summer', ARRAY['S', 'M', 'L', 'XL'], 12, 'blue'),
('Blue Wool Blend Pants', 119.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/blue/b7.webp', 'Warm blue wool blend pants for winter', ARRAY['S', 'M', 'L', 'XL'], 8, 'blue'),
('Blue Athletic Pants', 59.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/blue/b8.webp', 'Comfortable blue athletic pants for active lifestyle', ARRAY['S', 'M', 'L', 'XL'], 20, 'blue'),
('Blue Formal Trousers', 149.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/blue/b9.webp', 'Premium blue formal trousers for special occasions', ARRAY['S', 'M', 'L', 'XL'], 7, 'blue');

-- Insert Green Pants (g1-g9)
INSERT INTO pants (name, price, image_url, description, sizes, stock, category) VALUES
('Classic Green Slim Fit', 89.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/green/g1.webp', 'Premium slim fit green pants for a natural look', ARRAY['S', 'M', 'L', 'XL'], 14, 'green'),
('Green Relaxed Chinos', 79.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/green/g2.webp', 'Comfortable green chinos with a modern relaxed fit', ARRAY['S', 'M', 'L', 'XL'], 16, 'green'),
('Green Tailored Trousers', 129.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/green/g3.webp', 'Elegant green trousers for formal occasions', ARRAY['S', 'M', 'L', 'XL'], 9, 'green'),
('Green Cargo Pants', 69.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/green/g4.webp', 'Durable green cargo pants with multiple pockets', ARRAY['S', 'M', 'L', 'XL'], 19, 'green'),
('Green Denim Jeans', 99.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/green/g5.webp', 'Classic green denim jeans with modern styling', ARRAY['S', 'M', 'L', 'XL'], 11, 'green'),
('Green Linen Pants', 89.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/green/g6.webp', 'Lightweight green linen pants for summer', ARRAY['S', 'M', 'L', 'XL'], 13, 'green'),
('Green Wool Blend Pants', 119.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/green/g7.webp', 'Warm green wool blend pants for winter', ARRAY['S', 'M', 'L', 'XL'], 7, 'green'),
('Green Athletic Pants', 59.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/green/g8.webp', 'Comfortable green athletic pants for active lifestyle', ARRAY['S', 'M', 'L', 'XL'], 24, 'green'),
('Green Formal Trousers', 149.99, 'https://react-atx-demo-bucket--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com/pants/green/g9.webp', 'Premium green formal trousers for special occasions', ARRAY['S', 'M', 'L', 'XL'], 5, 'green'); 