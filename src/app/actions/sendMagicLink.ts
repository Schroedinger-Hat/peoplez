"use server";

export async function sendMagicLink(prevState: any, formData: FormData) {
    // simulate some kind of data processing like persisting data
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("server action", formData);

    return {
        status: "success",
        message: `Welcome, ${formData.email}`,
    };
}