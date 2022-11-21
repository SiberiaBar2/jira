import useUser from "logichooks/useUsers";
import React from "react";
import { IdSelect } from "./id-select";

export const UseSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const {data: user} = useUser();
    return <IdSelect options={user || []} {...props} />
};
