import React from "react";
import { useParams } from "react-router-dom";

export default function PricingDetail() {
  const { id } = useParams();
  console.log("id", id);
  return <div>PricingDetail {id}</div>;
}
