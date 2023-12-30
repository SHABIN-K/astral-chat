import prisma from "@/utils/prisma";

export async function POST(req) {
  const { userID, name, about, email, phoneNumber, location } =
    await req.json();

  try {
    //find user by user id
    const user = await prisma.User.findFirst({
      where: { id: userID },
    });

    // Create the new Shop
    const newShop = await prisma.shop.create({
      data: {
        userId: user.id,
        name: name.trim(),
        about: about.trim(),
        email,
        phoneNumber,
        location: location.trim(),
      },
    });

    return new Response(JSON.stringify(newShop), {
      status: 201, // Created
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing the request:", error);

    return new Response("An error occurred", {
      status: 500, // Internal Server Error
    });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  console.log(id);
  try {
    await prisma.shop.delete({
      where: { id: id },
    });

    // Process the data and send an appropriate response
    return new Response("Request processed successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing the request:", error);

    return new Response("An error occurred", {
      status: 500, // Internal Server Error
    });
  }
}
