// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: "Api",
  tagTypes: ["Products", "Categories"],
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://fed-storefront-backend-harindi.onrender.com/api/ ",
    prepareHeaders: async (headers) => {
      try {
        const token = await window.Clerk?.session?.getToken();
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      } catch (error) {
        console.error("Error getting token:", error);
        return headers;
      }
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
      providesTags: ["Products"],
    }),
    getCategories: builder.query({
      query: () => `categories`,
      providesTags: ["Categories"],
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`,
    }),
    
    createOrder: builder.mutation({
      query: (body) => ({
        url: `orders`,
        method: "POST",
        body,
      }),
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: 'orders/my-orders',
        method: 'GET',
      }),
      transformErrorResponse: (response) => {
        console.log("Error response:", response);
        return response;
      },
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: {
          ...data,
          categoryId: data.category,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetProductQuery,
  useGetMyOrdersQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = Api;