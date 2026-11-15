import { LuArrowUpRight, LuGithub } from 'react-icons/lu'
import { Link } from 'react-router-dom'
const Footer = () => (
  <footer className="site-footer">
    <div className="footer-main page-width">
      <div>
        <Link to="/" className="brand">
          <span>
            fastcheckout<span className="brand-period">.</span>
          </span>
        </Link>
        <p>Tu estilo. Tu ritmo. Tu próximo paso.</p>
      </div>
      <a
        href="https://github.com/JOSY12"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-github"
      >
        <LuGithub /> Hecho por JOSY12 <LuArrowUpRight />
      </a>
    </div>
    <div className="footer-bottom page-width">
      <span>© {new Date().getFullYear()} FASTCHECKOUT</span>
      <span>TIENDA DEMO / PAGOS DE PRUEBA</span>
      <a href="#">VOLVER ARRIBA ↑</a>
    </div>
  </footer>
)
export default Footer
