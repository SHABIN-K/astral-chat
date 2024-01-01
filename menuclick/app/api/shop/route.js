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
  const { id, userRole, name, email, phoneNumber } = await req.json();
  try {
    // Check if a user already exists by email
    const existingUser = await prisma.user.findFirst({
      where: { id: id },
    });

    // Check if any data has changed
    const hasDataChanged =
      existingUser.userRole !== userRole ||
      existingUser.name !== name ||
      existingUser.email !== email ||
      existingUser.phoneNumber !== phoneNumber;

    if (!hasDataChanged) {
      return new Response("No changes were made", {
        status: 200, // OK
        statusText: "FAILED",
      });
    }

    // Check if another user with the same email exists
    const otherUserWithSameEmail = await prisma.user.findFirst({
      where: {
        email: email,
        id: {
          not: id,
        },
      },
    });

    if (otherUserWithSameEmail) {
      return new Response("User with this email already exists", {
        status: 200,
        statusText: "FAILED",
      });
    }

    // update the user
    const updateUser = await prisma.user.update({
      where: { id: id },
      data: {
        userRole: userRole,
        name,
        email,
        phoneNumber,
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
