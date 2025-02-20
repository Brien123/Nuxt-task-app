const baseAPI = "http://localhost:5000/tasks";
export const getProducts = async () => {
  const response = await fetch(baseAPI);
  return response.json();
}

export const getProduct = async (id: string) => {
  const response = await fetch(`${baseAPI}/${id}`);
  return response.json();
}

export const updateProduct = async (id: string, product: any) => {
    const response = await fetch(`${baseAPI}/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    return response.json();
}

export const deleteProduct = async (id: string) => {
    const response = await fetch(`${baseAPI}/${id}`, {
        method: "DELETE",
    });
    return response.json();
}

// tests
// getProducts().then((products) => console.log(products));
// getProduct("67b5c0898753078fb9558eac").then((product) => console.log(product));
// updateProduct("67b5c0898753078fb9558eac", { title: "Say good bye to jan" });
