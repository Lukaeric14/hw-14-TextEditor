import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("putting to db");

  const db = await openDB("jate", 1);
  const transaction = db.transaction("jate", "readwrite");
  const store = transaction.objectStore("jate");
  const res = store.put({ id: 1, value: content });

  console.log("data saved to db", res.value);
};

export const getDb = async () => {
  console.log("getting from db");

  const db = await openDB("jate", 1);
  const transaction = db.transaction("jate", "readonly");
  const store = transaction.objectStore("jate");
  const res = await store.get(1);

  if (res) {
    console.log("Retrieved Data: ", res.value);
    return res.value;
  } else if (!res) {
    console.log("No Data found in db");
    return;
  }
};

initdb();
