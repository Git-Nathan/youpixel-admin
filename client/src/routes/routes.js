import { HeaderOnly } from '~/layouts'

import Watch from '~/pages/Watch'
import StudioLayout from '~/layouts/DefaultLayout'
import Approval from '~/pages/Approval'
import Channel from '~/pages/Channel'
import Results from '~/pages/Results'
import ReportedComment from '~/pages/ReportedComment'
import SidebarOnly from '~/layouts/SidebarOnly'

export const publicRoutes = [
  { path: '/admin', conponemt: Approval },
  { path: '/watch', conponemt: Watch, layout: HeaderOnly },
  { path: '/channel/:id', conponemt: Channel },
  { path: '/results', conponemt: Results, layout: SidebarOnly },
]

export const privateRoutes = [
  {
    path: '/admin/approval',
    conponemt: Approval,
    layout: StudioLayout,
  },
  {
    path: '/admin/reported',
    conponemt: ReportedComment,
    layout: StudioLayout,
  },
]
