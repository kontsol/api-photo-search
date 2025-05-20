const API_URL = "https://monumenta-backoffice.niovity.com/openaccess/search";

export async function searchPhotos({ query }) {
  const body = {
    models: ["Photo"],
    fields: [],
    sorting: [{ field: "date_tekmiriosi", order: "ASC" }],
    query: {
      filters: {
        fulltext: {
          fields: ["caption::el"],
          expression: query,
        },
      },
    },
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Search request failed");

  const data = await res.json();
  return data.items || [];
}

export async function advancedSearchPhotos({ query }) {
  const body = {
    models: ["Photo"],
    fields: [],
    sorting: [{ field: "date_tekmiriosi", order: "asc" }],
    query: {
      filters: {
        and: [
          {
            fulltext: {
              fields: ["caption::el"],
              expression: query,
            },
          },
          {
            not: {
              exists: "depictedSubject",
            },
          },
          {
            fulltext: {
              fields: ["photographer.Person.name::el"],
              expression: '"Φωτεινή Μπέλλιου"',
            },
          },
        ],
      },
    },
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Search request failed");

  const data = await res.json();
  return data.items || [];
}
