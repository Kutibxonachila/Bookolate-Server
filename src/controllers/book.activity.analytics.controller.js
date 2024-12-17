 import {
   updateBookAnalytics,
   getBookAnalytics,
 } from "../services/book.activity.analytic.service.js"; 

 // Update or create book analytics controller
 export const updateBookAnalyticsController = async (req, res) => {
   try {
     const analyticsData = req.body;

     // Validate required fields
     if (!analyticsData.id) {
       return res
         .status(400)
         .json({ message: "Missing 'id' field in analytics data" });
     }

     // Update or create analytics record
     const updatedRecord = await updateBookAnalytics(analyticsData);

     // Respond with success
     res.status(200).json({
       message: "Book analytics updated/created successfully",
       updatedRecord,
     });
   } catch (error) {
     // Handle errors
     res.status(500).json({
       message: error.message,
     });
   }
 };

 // Get book analytics controller with pagination
 export const getBookAnalyticsController = async (req, res) => {
   try {
     const { page = 1, pageSize = 10 } = req.query; // Default pagination values

     const analytics = await getBookAnalytics(page, pageSize);

     // Respond with the fetched analytics data
     res.status(200).json({
       message: "Book analytics fetched successfully",
       data: analytics.rows,
       totalRecords: analytics.count,
       totalPages: Math.ceil(analytics.count / pageSize),
     });
   } catch (error) {
     // Handle errors
     res.status(500).json({
       message: error.message,
     });
   }
 };
