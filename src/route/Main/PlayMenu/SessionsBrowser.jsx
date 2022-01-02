import React from 'react';
import { withRouter } from 'react-router';


import { Trans } from '@lingui/macro';

import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RefreshIcon from '@material-ui/icons/Refresh';

import TableIcons from 'components/TableIcons';
import UserText from 'components/UserText';

import NewSessionModal from 'route/Main/PlayMenu/SessionsBrowser/NewSessionModal';

import Chess from '5d-chess-js';
import ChessClock from '5d-chess-clock';
import moment from 'moment';

import EmitterContext from 'utils/EmitterContext';
import * as authStore from 'state/auth';
import * as sessions from 'network/sessions';

class SessionsBrowser extends React.Component {
  static contextType = EmitterContext;
  tableRef = React.createRef();
  chess = new Chess();
  chessClock = new ChessClock();
  state = {
    openModal: false,
    loggedIn: authStore.isLoggedIn()
  };
  componentDidMount() {
    //Update state if auth store is changed
    this.authListener = this.context.on('authUpdate', () => {
      this.setState({ loggedIn: authStore.isLoggedIn() });
    });
  }
  componentWillUnmount() {
    //Stop listening to auth store changes
    if(typeof this.authListener === 'function') { this.authListener(); }
  }
  render() {
    let variants = this.chess.variants.filter(e => e.shortName !== 'custom');
    let formats = this.chessClock.formats;
    return (
      <>
        <NewSessionModal
          open={this.state.openModal && this.state.loggedIn}
          onCancel={() => { this.setState({ openModal: false }); }}
        />
        <MaterialTable
          tableRef={this.tableRef}
          title={<Trans>Online Game Browser</Trans>}
          icons={TableIcons}
          columns={[
            {
              title: <Trans>White Player</Trans>,
              field: 'white',
              render: (rowData) => {
                if(typeof rowData.white !== 'string' || rowData.white.length <= 0) {
                  return (
                    <Typography>
                      <i>
                        <Trans>[Empty]</Trans>
                      </i>
                    </Typography>
                  )
                }
                return <UserText username={rowData.white} />
              },
              searchable: true,
              filtering: true
            },
            {
              title: <Trans>Black Player</Trans>,
              field: 'black',
              render: (rowData) => {
                if(typeof rowData.black !== 'string' || rowData.black.length <= 0) {
                  return (
                    <Typography>
                      <i>
                        <Trans>[Empty]</Trans>
                      </i>
                    </Typography>
                  )
                }
                return <UserText username={rowData.black} />
              },
              searchable: true,
              filtering: true
            },
            {
              title: <Trans>Ranked</Trans>,
              field: 'ranked',
              type: 'boolean',
              searchable: false,
              filtering: false
            },
            {
              title: <Trans>Variant</Trans>,
              field: 'variant',
              render: (rowData) => {
                if(rowData.variant.includes('[')) {
                  return <Trans>Custom Variant</Trans>
                }
                for(let variant of variants) {
                  if(variant.shortName === rowData.variant) {
                    return variant.name.replace('Standard - ','');
                  }
                }
                return <Trans>Unknown Variant</Trans>
              },
              searchable: false,
              filtering: false
            },
            {
              title: <Trans>Format</Trans>,
              field: 'format',
              render: (rowData) => {
                if(rowData.timed === null) {
                  return <Trans>Untimed</Trans>;
                }
                for(let format of formats) {
                  if(format.shortName === rowData.format) {
                    return format.name;
                  }
                }
                return rowData.format;
              },
              searchable: false,
              filtering: false
            },
            {
              title: <Trans>Started</Trans>,
              field: 'started',
              type: 'boolean',
              searchable: false,
              filtering: false
            },
            {
              title: <Trans>Start / Creation Date</Trans>,
              field: 'startDate',
              render: rowData => moment(rowData.startDate).fromNow(),
              defaultSort: 'desc',
              searchable: false,
              filtering: false
            },
            {
              title: <Trans>Ended</Trans>,
              field: 'ended',
              type: 'boolean',
              searchable: false,
              filtering: false
            },
            {
              title: <Trans>End Date</Trans>,
              field: 'endDate',
              render: rowData => rowData.endDate === null || rowData.endDate === 0 ?
                <Trans>Has not ended</Trans>
              :
                moment(rowData.endDate).fromNow(),
              searchable: false,
              filtering: false
            }
          ]}
          data={async (query) => {
            let sort = {};
            if(typeof query.orderBy !== 'undefined') {
              sort[query.orderBy.field] = query.orderDirection === 'asc' ? 1 : -1;
            }
            let sessionData = [];
            try {
              sessionData = await sessions.getSessionsQuery({}, {}, sort, query.pageSize, query.page);
            }
            catch(err) {}
            return {data: sessionData, page: query.page, totalCount: 0};
          }}
          actions={[
            {
              icon: AddIcon,
              tooltip: <Trans>New Game</Trans>,
              disabled: !this.state.loggedIn,
              isFreeAction: true,
              onClick: () => { this.setState({ openModal: true }); }
            },
            {
              icon: RefreshIcon,
              tooltip: <Trans>Refresh</Trans>,
              isFreeAction: true,
              onClick: () => {
                if(this.tableRef.current) {
                  this.tableRef.current.onQueryChange()
                }
              },
            },
            (rowData) => ({
              icon: ArrowForwardIcon,
              tooltip: <Trans>Go</Trans>,
              onClick: () => {
                this.props.history.push('/play?id=' + rowData.id);
              }
            })
          ]}
          localization={{
            body: {
              emptyDataSourceMessage: <Trans>No games available online</Trans>
            }
          }}
          options={{
            actionsColumnIndex: -1,
            filtering: true
          }}
        />
      </>
    );
  }
}

export default withRouter(SessionsBrowser);