import { Injectable } from '@angular/core';

@Injectable()
export class GraphService {
    public indexes = [];
    private blocks = 0;
    private maxBlocks = 20;
    private maxNodeSize = 15;

    private colors = {
        account: '#3e69f4',
        credit: '#7CB342',
        debit: '#d32f2f',
        block: '#f7673c',
        tx: '#41c3f5'
    };

    public refresh(sigma: any, block: any) {
        if (block) {
            this._addBlock(block, sigma);
        }
        // if (this.blocks > 0) {
        //   this.loading = false;
        // }
        if (sigma) {
            this._sizeNodes(sigma);
            this._positionNodes(sigma);
            sigma.refresh();
        }
    }

    private _sizeNodes(sigma: any) {
        const self = this;
        sigma.graph.nodes().forEach(function (node) {
            const deg = sigma.graph.degree(node.id);
            node.size = self.maxNodeSize * Math.sqrt(deg);
        });
    }

    private _positionNodes(sigma: any) {
        for (let type = 0; type < 3; type++) {
            const nodes = this._nodesByType(type, sigma);
            const len = nodes.length;
            const slice = 2 * Math.PI / len;

            for (let i = 0; i < len; i++) {
                const angle = slice * i,
                      node = nodes[i];
                const graph = sigma.graph.nodes(node.id);
                graph.x = (type + 1) * Math.cos(angle);
                graph.y = (type + 1) * Math.sin(angle);
            }
        }
    }

    private _nodesByType(type: any, sigma: any) {
        return sigma.graph.nodes().filter(function (node) {
            return node.type === type;
        });
    }

    private _addBlock(block: any, sigma: any) {
        if (this.indexes.includes(block.id)) { return; }

        if ((this.blocks + 1) > this.maxBlocks) { this._clearAll(sigma); }
        this._addNode({
            id: block.id,
            label: block.id,
            timestamp: block.timestamp,
            type: 1,
            color: this.colors.block,
            size: 1
        }, sigma);
        this.blocks++;
        this.indexes.push(block.id);

        this._addBlockGenerator(block, sigma);
        this._addBlockTxs(block, sigma);
    }

    private _clearAll(sigma) {
        this.blocks = 0;
        this.indexes = [];
        if (sigma) {
            sigma.graph.clear();
        }
    }

    private _addNode(node: any, sigma: any) {
        if (!this.indexes.includes(node.id)) {
            node.x = Math.random();
            node.y = Math.random();
            this.indexes.push(node.id);
            sigma.graph.addNode(node);
        }
    }

    private _addBlockGenerator(block: any, sigma: any) {
        this._addAccount(block.generatorId, sigma);
        this._addEdge({
            id: block.id + block.generatorId,
            label: block.height.toString(),
            source: block.generatorId,
            target: block.id,
            color: this.colors.account,
            size: 1,
            // drawEdgeLabels: true
        }, sigma);
    }

    private _addAccount(id: any, sigma: any) {
        this._addNode({
            id: id,
            type: 2,
            label: id,
            color: this.colors.account,
            size: 1
        }, sigma);
    }

    private _addEdge(edge: any, sigma: any) {
        if (!this.indexes.includes(edge.id)) {
            this.indexes.push(edge.id);
            sigma.graph.addEdge(edge);
        }
    }

    private _addBlockTxs(block: any, sigma: any) {
        const self = this;
        if (block.transactions) {
            block.transactions.forEach(function (tx) {
              self._addTx(tx, sigma);
              self._addEdge({
                id: block.id + tx.id,
                source: block.id,
                target: tx.id,
                color: self.colors.block,
                size: 1
              }, sigma);
            });
        }
    }

    private _addTx(tx: any, sigma: any) {
        if (this.indexes.includes(tx.id)) { return; }
        this._addNode({
            id: tx.id,
            label: tx.id,
            type: 0,
            amount: tx.amount,
            color: this.colors.tx,
            size: 1
        }, sigma);
        this.indexes.push(tx.id);
        this._addTxSender(tx, sigma);
        this._addTxRecipient(tx, sigma);
    }

    private _addTxSender(tx: any, sigma: any) {
        this._addAccount(tx.senderId, sigma);
        this._addEdge({
            id: tx.id + tx.senderId + Math.random(),
            label: this._amount(tx, '-'),
            source: tx.senderId,
            target: tx.id,
            color: this.colors.debit,
            size: 1
        }, sigma);
    }

    private _amount(tx: any, sign: any) {
        return (sign + tx.amount / Math.pow(10, 8)) + ' ARK';
    }

    private _addTxRecipient(tx: any, sigma: any) {
        if (!tx.recipientId) { return; }
        this._addAccount(tx.recipientId, sigma);
        this._addEdge({
            id: tx.id + tx.recipientId + Math.random(),
            label: this._amount(tx, '+'),
            source: tx.id,
            target: tx.recipientId,
            color: this.colors.credit,
            size: 1
        }, sigma);
    }

}
