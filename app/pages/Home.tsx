import * as React from "react";
import Page, { PageProps } from '../layouts/Page';
import Button from "@mui/material/Button";

export function ButtonUsage() {
  return <Button variant="contained">Hello world!</Button>;
}

const homePageInfo = Page.info(
  'home',
  'Home',
)

export default function Home(props: PageProps) {
  const state = {...homePageInfo, ...props};

  return (
    <Page {...state}>
      <b>Homepage</b>
      <ButtonUsage />
    </Page>
  );
}
