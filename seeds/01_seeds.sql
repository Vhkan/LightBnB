-- Inserting into USERS Table
INSERT INTO users (name, email, password)
VALUES ('John Smith', 'js@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Matt Johnson', 'mj@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Stephen Mattewson', 'sm@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


-- Inserting into PROPERTIES Table
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'ocean_view', 'description1', 'https://www.travelandleisure.com/thmb/wezft0EOc1rRFxsCB2JCfseksqs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1-71d7208a004a48b7bc1617a7e77183ea.jpg', 'https://www.travelandleisure.com/thmb/wezft0EOc1rRFxsCB2JCfseksqs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1-71d7208a004a48b7bc1617a7e77183ea.jpg', 300, 2, 2, 3, 'Dominicana', 'Gorgeous St', 'Santo Domingo', 'DM', 'T6W', true),
(2, 'sea_view', 'description2', 'https://images.pexels.com/photos/1662549/pexels-photo-1662549.jpeg?auto=compress&cs=tinysrgb&w=1600', 'https://images.pexels.com/photos/1662549/pexels-photo-1662549.jpeg?auto=compress&cs=tinysrgb&w=1600', 200, 1, 1, 2, 'Spain', 'Gaudi St', 'Barcelona', 'SP', 'A1N', true),
(3, 'bay_view', 'description3', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/74/c2/dc/caption.jpg?w=1200&h=-1&s=1', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/74/c2/dc/caption.jpg?w=1200&h=-1&s=1', 100, 1, 1, 1, 'Denmark', 'Nyhavn Waterfront', 'Copenhagen', 'CP', 'H5H', true);


-- Inserting into RESERVATIONS Table
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-09-11', '2019-09-26', 2, 2),
('2020-09-11', '2020-09-26', 3, 3);


-- -- Inserting into PROPERTY_REVIEWS Table
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 3, 3, 5, 'message1'),
(2, 2, 2, 4, 'message2'),
(1, 1, 1, 3, 'message3');

-- Password: $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u
-- Hashed word password