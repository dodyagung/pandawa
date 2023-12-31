import { useState, type ReactElement } from "react";
import { AuthLayout, DashboardLayout } from "@/components/@layout";
import Image from "next/image";
import Logo from "/public/logo.png";
import { useRouter } from "next/router";
import Head from "next/head";
import { NextPageWithLayout } from "../../_app";
import nookies, { destroyCookie, parseCookies } from "nookies";
import Link from "next/link";

const rupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx);
  const id = ctx.query.id;

  const res1 = await fetch(process.env.NEXT_PUBLIC_API_URL + "/aset/" + id, {
    headers: {
      Authorization: "Bearer " + cookies.access_token,
    },
  });
  const data1 = await res1.json();

  const res2 = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/aset/detail/" + id,
    {
      headers: {
        Authorization: "Bearer " + cookies.access_token,
      },
    }
  );

  let data2;
  if (res2.ok) {
    data2 = await res2.json();
  } else {
    data2 = {};
  }

  const res3 = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/aset/foto/" + id,
    {
      headers: {
        Authorization: "Bearer " + cookies.access_token,
      },
    }
  );

  let data3;
  if (res3.ok) {
    data3 = await res3.json();
  } else {
    data3 = [{}];
  }

  return { props: { data1, data2, data3 } };
};

const Page: NextPageWithLayout = ({ data1, data2, data3 }: any) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`Detail - Data Aset - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      </Head>
      <div className="p-6 mt-16 sm:ml-64">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 mr-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-red-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Data Aset
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  Detail
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-screen-xl mt-4">
          {/* Start coding here */}
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 sm:rounded-lg">
            <div className="mt-2 flex-row items-center justify-between space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
              <div>
                <h2 className="mr-3 font-semibold text-2xl dark:text-white">
                  Detail Aset
                </h2>
              </div>
              <Link
                href={`/aset/${router.query.id}/edit`}
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                  <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                </svg>
                Edit Data
              </Link>
            </div>
          </div>

          <>
            <div className="mb-4 mt-4 border-b border-gray-200 dark:border-gray-700">
              <ul
                className="flex flex-wrap -mb-px text-sm font-medium text-center"
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                <li className="mr-2" role="presentation">
                  <button
                    className="inline-block p-4 border-b-2 rounded-t-lg aria-selected:text-red-600 aria-selected:border-red-600"
                    id="informasi-tab"
                    data-tabs-target="#informasi"
                    type="button"
                    role="tab"
                    aria-controls="informasi"
                    aria-selected="false"
                  >
                    Informasi
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className="inline-block p-4 border-b-2 rounded-t-lg aria-selected:text-red-600 aria-selected:border-red-600"
                    id="detail-tab"
                    data-tabs-target="#detail"
                    type="button"
                    role="tab"
                    aria-controls="detail"
                    aria-selected="false"
                  >
                    Detail
                  </button>
                </li>
                <li role="presentation">
                  <button
                    className="inline-block p-4 border-b-2 rounded-t-lg aria-selected:text-red-600 aria-selected:border-red-600"
                    id="foto-tab"
                    data-tabs-target="#foto"
                    type="button"
                    role="tab"
                    aria-controls="foto"
                    aria-selected="false"
                  >
                    Foto
                  </button>
                </li>
              </ul>
            </div>

            <div id="myTabContent">
              <div
                className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                id="informasi"
                role="tabpanel"
                aria-labelledby="informasi-tab"
              >
                <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Status
                    </dt>
                    <dd className="font-semibold">{data1.status?.name}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Nama
                    </dt>
                    <dd className="font-semibold">{data1.name}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Kategori
                    </dt>
                    <dd className="font-semibold">{data1.kategori?.name}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Okupansi
                    </dt>
                    <dd className="font-semibold">{data1.occupancy?.name}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Deskripsi
                    </dt>
                    <dd className="font-semibold">{data1.description}</dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Perusahaan
                    </dt>
                    <dd className="font-semibold">{data1.perusahaan?.name}</dd>
                  </div>
                </dl>
              </div>
              <div
                className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                id="detail"
                role="tabpanel"
                aria-labelledby="detail-tab"
              >
                <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Alamat
                    </dt>
                    <dd className="font-semibold">
                      {data2.detail_alamat ?? "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Kode Pos
                    </dt>
                    <dd className="font-semibold">{data2.kode_pos ?? "-"}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Luas
                    </dt>
                    <dd className="font-semibold">{data2.luas ?? "-"}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Panjang x Lebar
                    </dt>
                    <dd className="font-semibold">
                      {data2.panjang ?? "-"} x {data2.lebar ?? "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Jumlah Lantai
                    </dt>
                    <dd className="font-semibold">
                      {data2.jumlah_lantai ?? "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Nilai Aset Perolehan
                    </dt>
                    <dd className="font-semibold">
                      {rupiah(data2.nilai_aset_perolehan) ?? "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Nilai Aset Sekarang
                    </dt>
                    <dd className="font-semibold">
                      {rupiah(data2.nilai_aset_sekarang) ?? "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Biaya Aset
                    </dt>
                    <dd className="font-semibold">
                      {rupiah(data2.biaya_aset) ?? "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Nilai Depresiasi
                    </dt>
                    <dd className="font-semibold">
                      {rupiah(data2.nilai_depresiasi) ?? "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Tanggal Perolehan
                    </dt>
                    <dd className="font-semibold">
                      {data2.tgl_perolehan ?? "-"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div
                className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                id="foto"
                role="tabpanel"
                aria-labelledby="foto-tab"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {data3.map((foto: any, index: number) => (
                    <div key={index}>
                      <img
                        className="block max-h-96 h-full w-full rounded-lg object-cover object-center"
                        src={foto.url}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
