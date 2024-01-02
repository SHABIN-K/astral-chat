import prisma from "@/utils/prisma";

export async function POST(req) {
  const { userID, name, userName, about, email, phoneNumber, location } =
    await req.json();

  try {
    // Create the new Shop
    const newShop = await prisma.shop.create({
      data: {
        userId: userID,
        name: name.trim(),
        userName: userName.toLowerCase().trim(),
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

export async function PATCH(req) {
  const { shopId, name, userName, about, email, phoneNumber, location } =
    await req.json();
  try {
    const findShop = await prisma.shop.findFirst({
      where: { id: shopId },
    });

    // Check if any data has changed
    const hasDataChanged =
      findShop.name !== name ||
      findShop.userName !== userName.toLowerCase() ||
      findShop.about !== about ||
      findShop.email !== email ||
      findShop.phoneNumber !== phoneNumber ||
      findShop.location !== location;

    if (!hasDataChanged) {
      return new Response("No changes were made", {
        status: 200, // OK
        statusText: "FAILED",
      });
    }

    // update the Shop
    const updateUser = await prisma.shop.update({
      where: { id: findShop.id },
      data: {
        name: name.trim(),
        userName: userName.toLowerCase().trim(),
        about: about.trim(),
        email,
        phoneNumber,
        location: location.trim(),
      },
    });

    return new Response(JSON.stringify(updateUser), {
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
