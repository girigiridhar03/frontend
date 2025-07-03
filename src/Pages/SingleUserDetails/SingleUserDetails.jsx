import {
  agentDetails,
  getSingleUser,
} from "@/Store/DashboardSlice/service/dashboard.service";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleUserDetails = () => {
  const { id, role } = useParams();
  const dispatch = useDispatch();
  const getsingleuser = useSelector(
    (state) => state?.dashboardReducer?.getsingleuser
  );
  const getSingleAgent = useSelector(
    (state) => state?.dashboardReducer?.getSingleAgent
  );

  useEffect(() => {
    if (role === "user") {
      dispatch(getSingleUser(id));
      return;
    }

    if (role === "agent") {
      dispatch(agentDetails(id));
    }
  }, [id]);

  console.log(getsingleuser, getSingleAgent);

  return <div>SingleUserDetails: {id}</div>;
};

export default SingleUserDetails;
