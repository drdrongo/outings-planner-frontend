import { NavLink, useLocation, Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../data/dummy";

function QueryNavLink({ to='', ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

interface Invoice {
  name: string;
  number: number;
  amount: string;
  due: string
}

export default function Invoices() {
  let [searchParams, setSearchParams] = useSearchParams(); // works like setState, but stores data in the search params instead

  let invoices: Invoice[] = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem"
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={event => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
        .filter(invoice => {
          let filter = searchParams.get("filter");
          if (!filter) return true;
          let name = invoice.name.toLowerCase();
          return name.startsWith(filter.toLowerCase());
        })
        .map(invoice => (
          <QueryNavLink // lets us show that this current link is acative or inactive.
          style={({ isActive=false }) => {
            return {
              display: "block",
              margin: "1rem 0",
              color: isActive ? "red" : ""
            };
          }}
          to={`/invoices/${invoice.number}`}
          key={invoice.number}
        >
          {invoice.name}
        </QueryNavLink>
        ))}
      </nav>
      <Outlet /> {/* Renders the child route's element, if there is one.*/}
    </div>
  );
}
