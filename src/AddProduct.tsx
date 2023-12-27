import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categories, subcategoriesMap } from "@/utils/constant";
import {
  getVariantFields,
  baseProductSchema,
} from "@/utils/productUtility";
import { luxuryProductSchema } from "@/utils/productUtility";

const AddProductForm = () => {
  const form = useForm<z.infer<typeof baseProductSchema>>({
    // resolver: zodResolver(productSchemaShoes),
    defaultValues: {
      image: [],
      title: "",
      category: "",
      subCategory: "",
      // productDetails: {
      //   highlights: "",
      //   productTags: "",
      //   productVariants: [
      //     {
      //       images: [],
      //     },
      //   ],
      // },
      productDetails: [],
    },
    // defaultValues: getDefaultValues("PosyLuxuryRequest"),
    resolver: zodResolver(baseProductSchema),
  });

  const { setValue, watch } = form;
  const selectedCategory = watch("category");
  const selectedSubCategory = watch("subCategory");

  useEffect(() => {
    if (selectedCategory) {
      setValue("subCategory", "");
    }
  }, [selectedCategory, setValue]);

  // Convert a file to base64 string
  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const isCategorySelected = Boolean(selectedCategory);
  const isSubCategorySelected = Boolean(selectedSubCategory);

  const isAddButtonClickable = isCategorySelected && isSubCategorySelected;

  const addButtonTitle = isAddButtonClickable
    ? undefined
    : "Select both category and subcategory to add variant";

  async function onSubmit(data: z.infer<typeof luxuryProductSchema>) {
    console.log("Form State:", form);
    try {
      console.log("data", data);
      // Additional logic for form submission
    } catch (error) {
      console.error("Error during form submission", error);
    }
  }

  const { fields, append, remove } = useFieldArray({
    name: "productDetails",
    control: form.control,
  });

  return (
    <div className="px-5 md:px-20 mt-10 ">
      <div className="p-8 border border-solid border-black border-opacity-20 rounded-lg">
        <h3 className="mb-8 font-medium">Fill Product Details</h3>
        <Form {...form} formState={form.formState}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6">
            <div className="w-full grid grid-cols-3 gap-4 max-md:grid-cols-1 max-lg:grid-cols-2 max-md:gap-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <div className="grid items-center gap-2">
                        <FormLabel htmlFor="image">
                          Image<span className="text-[#FEB406]">*</span>
                        </FormLabel>
                        <Input
                          id="image"
                          type="file"
                          required
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]; // Get the first selected file
                            if (file) {
                              const base64Image = await toBase64(file as File);
                              const fileObject = {
                                fileName: file.name,
                                data: base64Image,
                              };
                              setValue("image", fileObject);
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <FormLabel>
                          Title<span className="text-[#FEB406]">*</span>
                        </FormLabel>
                        <Input
                          placeholder="Enter the Title"
                          {...field}
                          required
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <FormLabel>
                          Category<span className="text-[#FEB406]">*</span>
                        </FormLabel>
                        <select
                          {...field}
                          required
                          className="border p-2 rounded-md"
                          placeholder="Select NFC Type">
                          <option value="" disabled hidden>
                            Select Category
                          </option>
                          {categories.map((category, i) => (
                            <option key={i} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem className="mb-10">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <FormLabel>
                          Sub Category<span className="text-[#FEB406]">*</span>
                        </FormLabel>
                        <select
                          {...field}
                          required
                          className="border p-2 rounded-md"
                          placeholder="Select Sub Category"
                          disabled={!selectedCategory}>
                          <option value="" disabled hidden>
                            Select Sub Category
                          </option>
                          {subcategoriesMap[selectedCategory]?.map(
                            (subcategory: string) => (
                              <option key={subcategory} value={subcategory}>
                                {subcategory}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />
            <div>
              <div className="flex justify-between items-center mb-12">
                <h3 className="font-medium">Product Variants</h3>
                <button
                  className="flex gap-2 items-center"
                  disabled={!isSubCategorySelected}>
                  <Plus size={18} />
                  <span
                    title={addButtonTitle}
                    className={`text-sm underline  cursor-pointer ${
                      isAddButtonClickable ? "text-primary" : "text-gray-500"
                    }`}
                    onClick={() => {
                      append({});
                    }}>
                    Add Product Variants
                  </span>
                </button>
              </div>
              <div>
                {fields.map((item, index) => (
                  <div key={index} className="mt-8">
                    <h3 className="text-base my-4 font-medium">
                      Please Fill the Product variant details
                    </h3>
                    <div className="w-full grid grid-cols-3 gap-4 max-md:grid-cols-1 max-lg:grid-cols-2 max-md:gap-2">
                      {getVariantFields(form.watch("subCategory")).map(
                        (variantField, fieldIndex) => {
                          return (
                            <FormField
                              key={fieldIndex}
                              control={form.control}
                              name={`productDetails.${index}.${variantField.name}`}
                              // name={`productDetails.productVariants.${index}.${variantField.name}`}
                              render={({ field }) => (
                                <FormItem className="mb-4">
                                  <FormControl>
                                    <div className="flex flex-col gap-2">
                                      <FormLabel>
                                        {variantField.name}
                                        {variantField.required && (
                                          <span className="text-[#FEB406]">
                                            *
                                          </span>
                                        )}
                                      </FormLabel>
                                      {variantField.name.toLowerCase() ===
                                      "images" ? (
                                        <Input
                                          id="picture"
                                          type="file"
                                          required
                                          multiple
                                          accept="image/*"
                                          onChange={async (e) => {
                                            const files = e.target.files;
                                            if (files && files.length > 0) {
                                              const imageSet =
                                                await Promise.all(
                                                  Array.from(files).map(
                                                    async (file) => ({
                                                      fileName: file.name,
                                                      image:
                                                        await toBase64(file),
                                                    }),
                                                  ),
                                                );

                                              const imageData = {
                                                imageSet: imageSet,
                                              };
                                              setValue(
                                                `productDetails.${index}.${variantField.name}`,
                                                [imageData],
                                              );
                                            }
                                          }}
                                        />
                                      ) : (
                                        <Input
                                          placeholder={`Enter ${variantField.name}`}
                                          {...field}
                                          required={field.required}
                                        />
                                      )}
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          );
                        },
                      )}
                    </div>
                    <div className="flex gap-6 mt-6">
                      <Button
                        className="bg-gray-100"
                        onClick={() => {
                          remove(index);
                        }}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Separator className="my-10" />
            <div className="flex gap-6 ">
              <Button type="submit">Submit</Button>
              <Button className="bg-gray-400">Cancel</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProductForm;
