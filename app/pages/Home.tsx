import * as React from "react";
import Page, { PageProps } from '../layouts/Page';
import Button from "@mui/material/Button";
import { Link } from "@mui/material";

export function ButtonUsage() {
  return <Button variant="contained">Hello world!</Button>;
}

const homePageInfo = Page.info('home', 'Home', {
  noheader: true,
  fullbleed: true,
})

function NavLink(props: { tag: string, label: string, target: string }) {
  const { tag, label, target } = props

  return (
    <li key={tag}>
      <Link href={target}>{label}</Link>
    </li>
  )
}

const links = [
  {tag: 'hi', label: 'Test', target: '/hi'},
];

export default function Home(props: PageProps) {
  const state = {...homePageInfo, ...props};

  return (
    <Page {...state}>
      <b>Elide Homepage</b>
      <br />
      <nav>
        <ul>
          {links.map((link) => (
            <NavLink {...link} />
          ))}
        </ul>
      </nav>
    </Page>
  );
}
