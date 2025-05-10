import React from 'react';
import ProductDetails from "@/components/ProductDetails/ProductDetails";

const ProductDetailsPage = () => {

    const product = {
        "success": true,
        "message": "Single Product fetched successfully",
        "data": {
            "id": "2e37bfd7-ce4f-4d18-ac84-73dfd5cd3a58",
            "name": "Dell Laptop",
            "price": 1299.99,
            "description": "A high-precision wireless mouse with ergonomic design.",
            "imageUrl": "https://res.cloudinary.com/dza9jdqt6/image/upload/v1746851980/rrzpqznc0ceyhvsjywxw.png",
            "isDeleted": false,
            "createdAt": "2025-05-10T04:39:41.351Z",
            "updatedAt": "2025-05-10T04:39:41.351Z",
            "companyId": "da6e8918-e93f-4288-be2d-eb344a383afc",
            "categoryId": "92e06cf3-87d1-45a9-84bb-5fb829962290",
            "reviews": [
                {
                    "id": "9f7f2365-85a0-476d-b01d-1e20310b92f5",
                    "title": "Great Product!",
                    "description": "I really enjoyed using this product. It exceeded my expectations.",
                    "rating": 5,
                    "categoryId": "92e06cf3-87d1-45a9-84bb-5fb829962290",
                    "productId": "2e37bfd7-ce4f-4d18-ac84-73dfd5cd3a58",
                    "isPremium": true,
                    "reviewerName": "user",
                    "reviewerEmail": "user@gmail.com",
                    "reviewerProfilePhoto": null,
                    "createdAt": "2025-05-10T05:13:18.710Z",
                    "updatedAt": "2025-05-10T05:13:18.710Z",
                    "isDeleted": false,
                    "ReviewComment": [],
                    "votes": []
                },
                {
                    "id": "32793973-be50-416c-a823-3a8c789dc120",
                    "title": "Kharap Product!",
                    "description": "I really enjoyed using this product. It exceeded my expectations.",
                    "rating": 5,
                    "categoryId": "92e06cf3-87d1-45a9-84bb-5fb829962290",
                    "productId": "2e37bfd7-ce4f-4d18-ac84-73dfd5cd3a58",
                    "isPremium": true,
                    "reviewerName": "user",
                    "reviewerEmail": "user@gmail.com",
                    "reviewerProfilePhoto": null,
                    "createdAt": "2025-05-10T05:13:40.823Z",
                    "updatedAt": "2025-05-10T05:13:40.823Z",
                    "isDeleted": false,
                    "ReviewComment": [],
                    "votes": []
                },
                {
                    "id": "758db200-afdd-4c2d-b279-d4f2d6b4985a",
                    "title": "Keu Kinben na!",
                    "description": "I really enjoyed using this product. It exceeded my expectations.",
                    "rating": 5,
                    "categoryId": "92e06cf3-87d1-45a9-84bb-5fb829962290",
                    "productId": "2e37bfd7-ce4f-4d18-ac84-73dfd5cd3a58",
                    "isPremium": true,
                    "reviewerName": "user",
                    "reviewerEmail": "user@gmail.com",
                    "reviewerProfilePhoto": null,
                    "createdAt": "2025-05-10T05:13:55.204Z",
                    "updatedAt": "2025-05-10T05:13:55.204Z",
                    "isDeleted": false,
                    "ReviewComment": [
                        {
                            "id": "07449065-2091-4249-80a0-be61a9d7d4e8",
                            "reviewId": "758db200-afdd-4c2d-b279-d4f2d6b4985a",
                            "accountId": "8b2ecce8-78c8-432d-832b-9f936102589f",
                            "content": "Great review! I found your insights very helpful.",
                            "createdAt": "2025-05-10T05:14:15.482Z",
                            "updatedAt": "2025-05-10T05:14:15.482Z",
                            "isDeleted": false,
                            "account": {
                                "id": "8b2ecce8-78c8-432d-832b-9f936102589f",
                                "email": "user@gmail.com",
                                "password": "$2b$10$i306DaFTRuzx6GmKdkrtKe8TNp9XThnF119AY/1bL9FwCGo8uJb2O",
                                "role": "USER",
                                "createdAt": "2025-05-09T15:21:53.385Z",
                                "updatedAt": "2025-05-10T05:18:53.919Z",
                                "status": "ACTIVE",
                                "isDeleted": false,
                                "isCompleteProfile": true,
                                "isPremium": false,
                                "user": {
                                    "id": "43f45d0e-a894-4c09-9e4b-0d1bdc2be74c",
                                    "name": "user",
                                    "accountId": "8b2ecce8-78c8-432d-832b-9f936102589f",
                                    "profileImage": "https://res.cloudinary.com/dza9jdqt6/image/upload/v1746854331/rqsoxnhs8nara3k8haqh.png",
                                    "bio": "Home appliance expert",
                                    "createdAt": "2025-05-09T15:21:53.636Z",
                                    "updatedAt": "2025-05-10T05:18:52.554Z",
                                    "isDeleted": false
                                },
                                "admin": null
                            }
                        },
                        {
                            "id": "101f3225-b068-4207-83f5-ce0beea0e8f7",
                            "reviewId": "758db200-afdd-4c2d-b279-d4f2d6b4985a",
                            "accountId": "8b2ecce8-78c8-432d-832b-9f936102589f",
                            "content": "Great review! I found very bad expectations.",
                            "createdAt": "2025-05-10T05:14:33.142Z",
                            "updatedAt": "2025-05-10T05:14:33.142Z",
                            "isDeleted": false,
                            "account": {
                                "id": "8b2ecce8-78c8-432d-832b-9f936102589f",
                                "email": "user@gmail.com",
                                "password": "$2b$10$i306DaFTRuzx6GmKdkrtKe8TNp9XThnF119AY/1bL9FwCGo8uJb2O",
                                "role": "USER",
                                "createdAt": "2025-05-09T15:21:53.385Z",
                                "updatedAt": "2025-05-10T05:18:53.919Z",
                                "status": "ACTIVE",
                                "isDeleted": false,
                                "isCompleteProfile": true,
                                "isPremium": false,
                                "user": {
                                    "id": "43f45d0e-a894-4c09-9e4b-0d1bdc2be74c",
                                    "name": "user",
                                    "accountId": "8b2ecce8-78c8-432d-832b-9f936102589f",
                                    "profileImage": "https://res.cloudinary.com/dza9jdqt6/image/upload/v1746854331/rqsoxnhs8nara3k8haqh.png",
                                    "bio": "Home appliance expert",
                                    "createdAt": "2025-05-09T15:21:53.636Z",
                                    "updatedAt": "2025-05-10T05:18:52.554Z",
                                    "isDeleted": false
                                },
                                "admin": null
                            }
                        },
                        {
                            "id": "1cd772ca-cb68-4648-ab65-dfdf2bad96f0",
                            "reviewId": "758db200-afdd-4c2d-b279-d4f2d6b4985a",
                            "accountId": "8b2ecce8-78c8-432d-832b-9f936102589f",
                            "content": "Low Quality! I found very bad expectations.",
                            "createdAt": "2025-05-10T05:14:46.212Z",
                            "updatedAt": "2025-05-10T05:14:46.212Z",
                            "isDeleted": false,
                            "account": {
                                "id": "8b2ecce8-78c8-432d-832b-9f936102589f",
                                "email": "user@gmail.com",
                                "password": "$2b$10$i306DaFTRuzx6GmKdkrtKe8TNp9XThnF119AY/1bL9FwCGo8uJb2O",
                                "role": "USER",
                                "createdAt": "2025-05-09T15:21:53.385Z",
                                "updatedAt": "2025-05-10T05:18:53.919Z",
                                "status": "ACTIVE",
                                "isDeleted": false,
                                "isCompleteProfile": true,
                                "isPremium": false,
                                "user": {
                                    "id": "43f45d0e-a894-4c09-9e4b-0d1bdc2be74c",
                                    "name": "user",
                                    "accountId": "8b2ecce8-78c8-432d-832b-9f936102589f",
                                    "profileImage": "https://res.cloudinary.com/dza9jdqt6/image/upload/v1746854331/rqsoxnhs8nara3k8haqh.png",
                                    "bio": "Home appliance expert",
                                    "createdAt": "2025-05-09T15:21:53.636Z",
                                    "updatedAt": "2025-05-10T05:18:52.554Z",
                                    "isDeleted": false
                                },
                                "admin": null
                            }
                        }
                    ],
                    "votes": []
                }
            ]
        },
        "meta": null
    }

    const isLoading = false

    return (
        <>
            <ProductDetails productData={product} isLoading={isLoading} />
        </>
    );
};

export default ProductDetailsPage;