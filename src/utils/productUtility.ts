import * as z from "zod";

// Function to generate variant form fields based on subcategory
const getVariantFields = (subcategory: string) => {
  const subcategoryFields = {
    Shoes: [
      { name: "productSku", required: true, label: "SKU" },
      { name: "price", required: true, label: "Price" },
      { name: "description", required: true, label: "Description" },
      // { name: "highlights", required: true, label: "Highlights" },
      { name: "currency", required: false, label: "Currency" },
      { name: "size", required: true, label: "Size" },
      { name: "colour", required: true, label: "Colour" },
      { name: "material", required: false, label: "Material" },
      { name: "careInstructions", required: false, label: "Care Instructions" },
      { name: "ranking", required: false, label: "Ranking" },
      { name: "images", required: true, label: "Images" },
    ],
    Bags: [
      { name: "productSku", required: true, label: "SKU" },
      { name: "price", required: true, label: "Price" },
      { name: "currency", required: false, label: "Currency" },
      { name: "description", required: true, label: "Description" },
      { name: "size", required: true, label: "Size" },
      { name: "colour", required: true, label: "Colour" },
      { name: "material", required: false, label: "Material" },
      { name: "careInstructions", required: false, label: "Care Instructions" },
      { name: "ranking", required: false, label: "Ranking" },
      { name: "images", required: true, label: "Images" },
    ],
    Apparels: [
      { name: "productSku", required: true, label: "SKU" },
      { name: "price", required: true, label: "Price" },
      { name: "currency", required: false, label: "Currency" },
      { name: "description", required: true, label: "Description" },
      { name: "size", required: false, label: "Size" },
      { name: "colour", required: false, label: "Colour" },
      { name: "material", required: false, label: "Material" },
      { name: "careInstructions", required: false, label: "Care Instructions" },
      { name: "ranking", required: false, label: "Ranking" },
      { name: "images", required: true, label: "Images" },
    ],
    "Protein Powder": [
      { name: "SKU", required: true },
      { name: "Price", required: true },
      { name: "Currency", required: false },
      { name: "Description", required: true },
      { name: "Weight", required: false },
      { name: "Unit Of Measurement", required: false },
      { name: "Packaging Container Type", required: false },
      { name: "Flavour", required: false },
      { name: "images", required: true },
    ],
    Paintings: [
      { name: "SKU", required: true },
      { name: "Price", required: true },
      { name: "Currency", required: false },
      { name: "Description", required: true },
      { name: "Material", required: false },
      { name: "Artist", required: false },
      { name: "Material", required: false },
      { name: "Dimension", required: false },
      { name: "Rarity", required: false },
      { name: "Medium", required: false },
      { name: "Highlights", required: true },
      { name: "images", required: true },
    ],
  };
  return subcategoryFields[subcategory] || [];
};

// const baseProductSchema = z.object({
//   title: z
//     .string()
//     .min(3, "Title must be at least 3 characters")
//     .max(100, "Title must be at most 100 characters"),
//   category: z
//     .string()
//     .min(3, "Category must be at least 3 characters")
//     .max(50, "Category must be at most 50 characters"),
//   subCategory: z.string(),
//   image: z.object({
//     data: z.string(),
//     fileName: z.string(),
//   }),
//   productDetails: z.object({
//     highlights: z.string().optional(),
//     productTags: z.string().optional(),
//     productVariants: z.array(
//       z.object({
//         productSku: z.string(),
//         price: z.string(),
//         currency: z.string().optional(),
//         images: z.array(
//           z.object({
//             imageSet: z.array(
//               z.object({
//                 fileName: z.string(),
//                 image: z.string(),
//               }),
//             ),
//           }),
//         ),
//         description: z.string(),
//         metadata: z.object({}),
//       }),
//     ),
//   }),
// });

const baseProductSchema = z.object({
  image: z.custom<File[]>(),
  productTitle: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(50, "Category must be at most 50 characters"),
  subCategory: z.string(),
  productDetails: z.array(
    z.object({
      productSku: z.string(),
      price: z.string(),
      currency: z.string().optional(),
      description: z.string(),
      // ... add other common variant fields here
      images: z.custom<File[]>(),
    }),
  ),
});

// const generateDynamicSchema = (category: string) => {
//   switch (category) {
//     case "PostLuxuryRequest":
//       return z.object({
//         title: z.string(),
//         category: z.string(),
//         subCategory: z.string(),
//         image: z.object({
//           data: z.string(),
//           fileName: z.string(),
//         }),
//         productDetails: z.object({
//           highlights: z.string().optional(),
//           productTags: z.string().optional(),
//           productVariants: z.array(
//             z.object({
//               productSku: z.string(),
//               price: z.string(),
//               currency: z.string().optional(),
//               images: z.array(
//                 z.object({
//                   imageSet: z.array(
//                     z.object({
//                       fileName: z.string(),
//                       image: z.string(),
//                     }),
//                   ),
//                 }),
//               ),
//               packageContents: z.string().optional(),
//               description: z.string(),
//               inventory: z.number().optional(),
//               metadata: z.object({
//                 size: z.string(),
//                 colour: z.string().optional(),
//                 material: z.string().optional(),
//                 care: z.string().optional(),
//                 ranking: z.number().optional(),
//               }),
//             }),
//           ),
//         }),
//       });

//     case "PostLiquorRequest":
//       return z.object({
//         title: z.string(),
//         category: z.string(),
//         subCategory: z.string(),
//         email: z.string(),
//         image: z.object({
//           data: z.string(),
//           fileName: z.string(),
//         }),
//         productDetails: z.object({
//           highlights: z.string(),
//           productTags: z.string(),
//           productVariants: z.array(
//             z.object({
//               productSku: z.string(),
//               price: z.number(),
//               currency: z.string(),
//               packageContents: z.string(),
//               description: z.string(),
//               inventory: z.number(),
//               images: z.array(
//                 z.object({
//                   imageSet: z.array(
//                     z.object({
//                       fileName: z.string(),
//                       image: z.string(),
//                     }),
//                   ),
//                 }),
//               ),
//               metadata: z.object({
//                 volumn: z.number(),
//                 unitOfMeasurement: z.string(),
//                 abv: z.string(),
//                 ranking: z.number(),
//               }),
//             }),
//           ),
//         }),
//       });

//     case "PostHealthCareRequest":
//       return z.object({
//         title: z.string(),
//         category: z.string(),
//         subCategory: z.string(),
//         email: z.string(),
//         image: z.object({
//           data: z.string(),
//           fileName: z.string(),
//         }),
//         productDetails: z.object({
//           highlights: z.string(),
//           productTags: z.string(),
//           productVariants: z.array(
//             z.object({
//               productSku: z.string(),
//               price: z.number(),
//               currency: z.string(),
//               packageContents: z.string(),
//               description: z.string(),
//               inventory: z.number(),
//               images: z.array(
//                 z.object({
//                   imageSet: z.array(
//                     z.object({
//                       fileName: z.string(),
//                       image: z.string(),
//                     }),
//                   ),
//                 }),
//               ),
//               metadata: z.object({
//                 weight: z.number(),
//                 unitOfMeasurement: z.string(),
//                 packagingContainerType: z.string(),
//                 flavour: z.string(),
//                 ranking: z.number(),
//               }),
//             }),
//           ),
//         }),
//       });

//     case "PostArtRequest":
//       return z.object({
//         title: z.string(),
//         category: z.string(),
//         subCategory: z.string(),
//         email: z.string(),
//         image: z.object({
//           data: z.string(),
//           fileName: z.string(),
//         }),
//         productDetails: z.object({
//           highlights: z.string(),
//           productTags: z.string(),
//           productVariants: z.array(
//             z.object({
//               productSku: z.string(),
//               price: z.string(),
//               currency: z.string(),
//               images: z.array(
//                 z.object({
//                   imageSet: z.array(
//                     z.object({
//                       fileName: z.string(),
//                       image: z.string(),
//                     }),
//                   ),
//                 }),
//               ),
//               packageContents: z.string(),
//               description: z.string(),
//               inventory: z.number(),
//               metadata: z.object({
//                 artist: z.string(),
//                 material: z.string(),
//                 dimension: z.string(),
//                 rarity: z.string(),
//                 medium: z.string(),
//                 creationYear: z.number(),
//                 ranking: z.number(),
//               }),
//             }),
//           ),
//         }),
//       });

//     default:
//       return baseProductSchema;
//   }
// };

const luxuryProductSchema = z.object({
  title: z.string(),
  category: z.string(),
  subCategory: z.string(),
  image: z.object({
    data: z.string(),
    fileName: z.string(),
  }),
  productDetails: z.object({
    highlights: z.string().optional(),
    productTags: z.string().optional(),
    productVariants: z.array(
      z.object({
        productSku: z.string(),
        price: z.string(),
        currency: z.string().optional(),
        images: z.array(
          z.object({
            imageSet: z.array(
              z.object({
                fileName: z.string(),
                image: z.string(),
              }),
            ),
          }),
        ),
        packageContents: z.string().optional(),
        description: z.string(),
        inventory: z.number().optional(),
        metadata: z.object({
          size: z.string(),
          colour: z.string().optional(),
          material: z.string().optional(),
          care: z.string().optional(),
          ranking: z.number().optional(),
        }),
      }),
    ),
  }),
});

export { getVariantFields, baseProductSchema, luxuryProductSchema };
