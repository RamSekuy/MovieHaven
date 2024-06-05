"use client";

import React, { useState, useEffect } from "react";
import mainAPI from "@/app/_lib/mainApi";
import { ChangeEvent } from "react";
import BackEndForm from "@/app/_components/formComponent/backEndForm";

interface IStuido {
  id: number;
  idStudio: number;
  studioName: string;
  branchId: number;
}

type Props = {
  params: {
    branchId: string;
  };
};

export default function Page({ params }: Props) {
  const [studios, setStudios] = useState<IStuido[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState<IStuido | null>(null);
  const [input, setInput] = useState({});
  function inputHandler(e: ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  const fetchStudios = async () => {
    const result = await mainAPI.get(`/branch/${params.branchId}`);
    setStudios(result.data.data.studios);
  };

  useEffect(() => {
    fetchStudios();
  }, []);

  return (
    <div className="container mx-auto flex justify-center flex-col max-w-[850px] py-5">
      <button
        className="mb-5 px-5 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => setShowAddModal(true)}
      >
        Add Studio
      </button>

      {studios.map((e, i) => (
        <div
          key={i}
          className="mb-5 px-5 py-3 border-b border-black flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
        >
          <h1 className="text-xl">{e.studioName}</h1>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              setSelectedStudio(e);
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Delete Modal */}
      {selectedStudio && (
        <BackEndForm
          action={`/branch/b2/${selectedStudio.id}`}
          data={{}}
          method="delete"
          onSuccess={(e) => {
            const data = e.data.data;
            setStudios(studios.filter((e) => e.id !== data.id));
            setSelectedStudio(null)
          }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-5 rounded">
            <p>Apakah kamu yakin menghapus branch ini?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setSelectedStudio(null)}
              >
                Cancel
              </button>
              <input
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                value={"Delete"}
              />
            </div>
          </div>
        </BackEndForm>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <BackEndForm
          action="/branch/b2"
          method="post"
          data={{
            ...input,
            branchId: Number(params.branchId),
          }}
          onSuccess={(res) => {
            setStudios([...studios, res.data.data]);
            setShowAddModal(false);
          }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-5 rounded">
            <h2 className="text-xl mb-4">Add New Studio</h2>
            <div className="mb-4">
              <label className="block mb-2">Studio Name</label>
              <input
                id="studioName"
                type="text"
                className="w-full px-4 py-2 border rounded"
                onChange={inputHandler}
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <input
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                value={"Add"}
              />
            </div>
          </div>
        </BackEndForm>
      )}
    </div>
  );
}
