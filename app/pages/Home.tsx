import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Link as RouterLink } from 'react-router-dom';
import Page, { PageProps } from '../layouts/Page';
import Logo, { MarkStyle } from "../../components/logo/logo";

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
      <Link component={RouterLink} to={target}>{label}</Link>
    </li>
  )
}

const links = [
  {tag: 'architecture', label: 'Architecture', target: '/architecture'},
  {tag: 'languages', label: 'Languages', target: '/languages'},
  {tag: 'runtime', label: 'Runtime', target: '/runtime'},
  {tag: 'framework', label: 'Framework', target: '/framework'},
  {tag: 'guides', label: 'Guides', target: '/guides'},
  {tag: 'samples', label: 'Samples', target: '/samples'},
  {tag: 'docs', label: 'Docs', target: '/docs'},
  {tag: 'community', label: 'Community', target: '/community'},
];

export default function Home(props: Partial<PageProps>) {
  const state = {...homePageInfo, ...props} as PageProps;

  return (
    <Page {...state}>
      <b>Elide Homepage</b>
      <br />
      <nav>
        <ul>
          {links.map((link) => (
            <NavLink key={link.tag} {...link} />
          ))}
        </ul>
      </nav>
      <br />
      <Logo mode={MarkStyle.COLORS} size={64} />
      <br />
      <Logo mode={MarkStyle.GRAYS} size={64} />
    </Page>
  );
}

export const Component = Home;
