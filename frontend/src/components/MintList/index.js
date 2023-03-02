import { getFetch } from "../../fetch/getFetch";
import { useQuery } from "react-query";
const MintList = ({ metamask }) => {
  const { isLoading, data } = useQuery(
    `MINT_DATA`,
    async () =>
      await getFetch(`http://localhost:3001/mintdata/${metamask.account}`),
    {
      retry: 3,
    }
  );

  return (
    <div className="mt-10 bg-zinc-300 p-5 rounded-md">
      <p>Minted Data</p>
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class={`h-96 ${data?.length > 8 ? "overflow-y-scroll" : ""}`}>
            <table class="min-w-full overflow-x-scroll">
              <thead class="border-b">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <button
                    type="button"
                    class="bg-indigo-500 rounded p-3 ..."
                    disabled
                  >
                    Loading...
                  </button>
                ) : data && data.length > 0 ? (
                  <>
                    {data?.map((item) => {
                      return (
                        <tr class="border-b">
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item?.address}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item?.amount}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <p>No Minted data found</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintList;
