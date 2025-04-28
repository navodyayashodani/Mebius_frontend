// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: "Api",
  tagTypes: ["Products", "Categories"],
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: async (headers) => {
      try {
        // Get token asynchronously
        const token = await window.Clerk?.session?.getToken();
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
      } catch (error) {
        console.error("Error getting token:", error);
      }
      return headers;
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
    createCheckoutSession: builder.mutation({
      async queryFn({ items, shippingAddress }, _api, _extraOptions, baseQuery) {
        try {
          const token = await window.Clerk?.session?.getToken();
    
          if (!token) {
            throw new Error("No authentication token available");
          }
    
          console.log("Token:", token);
          console.log("Items:", items);
          console.log("Shipping Address:", shippingAddress);
    
          const result = await baseQuery({
            url: `payments/create-checkout-session`,
            method: "POST",
            body: { items, shippingAddress },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
    
          if (result.error) {
            console.error("Checkout session error:", result.error);
            return { error: result.error };
          }
    
          return { data: result.data };
        } catch (error) {
          console.error("Checkout session creation error:", error);
          return {
            error: {
              status: 500,
              data: { message: error.message || "Internal Server Error" },
            },
          };
        }
      },
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
  useCreateCheckoutSessionMutation,
} = Api;