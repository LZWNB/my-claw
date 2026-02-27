#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
可转债选股引擎 (集思录版)
筛选低风险可转债作为股票替代选项

筛选条件：
- 价格 < 130元（低风险）
- 转股溢价率 < 30%
- 剩余期限 > 1年
- 债券评级 AA- 以上
"""

import pandas as pd
from datetime import datetime
from typing import List, Dict, Optional
import akshare as ak


class BondSelector:
    """可转债选股引擎"""
    
    def __init__(self):
        """初始化"""
        print("✅ 可转债选股引擎已初始化 (集思录数据源)")
    
    def get_bond_list(self) -> Optional[pd.DataFrame]:
        """
        获取可转债实时数据 (集思录)
        
        Returns:
            DataFrame with bond data
        """
        try:
            # 使用akshare获取集思录可转债数据
            df = ak.bond_cb_jsl()
            
            if df is None or df.empty:
                return None
            
            return df
        except Exception as e:
            print(f"⚠️ 获取可转债列表失败: {e}")
            return None
    
    def select_bonds(self, top_n: int = 2) -> List[Dict]:
        """
        筛选低风险可转债
        
        筛选条件：
        - 价格 < 130元
        - 转股溢价率 < 30%
        - 剩余期限 > 1年
        - 评级 AA- 以上
        
        Args:
            top_n: 返回前几只
            
        Returns:
            List of bond dicts
        """
        print("=" * 60)
        print(f"🔷 可转债筛选 - 低风险选项")
        print("=" * 60)
        print()
        
        # 获取可转债列表
        df = self.get_bond_list()
        if df is None or df.empty:
            print("❌ 获取可转债数据失败")
            return []
        
        print(f"📊 分析 {len(df)} 只可转债...")
        print()
        
        results = []
        
        # 处理数据
        for idx, row in df.iterrows():
            try:
                # 获取基础信息
                bond_code = str(row.get('代码', '')).strip()
                bond_name = str(row.get('转债名称', '')).strip()
                
                if not bond_code or not bond_name:
                    continue
                
                # 获取价格
                price = 0
                try:
                    price = float(row.get('现价', 0))
                except:
                    continue
                
                # 价格筛选：80-130元
                if price >= 130 or price < 80:
                    continue
                
                # 获取涨跌幅
                change_pct = 0
                try:
                    change_pct = float(row.get('涨跌幅', 0))
                except:
                    pass
                
                # 获取转股溢价率
                premium = 100
                try:
                    premium = float(row.get('转股溢价率', 100))
                except:
                    continue
                
                # 溢价率筛选：<30%
                if premium >= 30:
                    continue
                
                # 获取剩余期限
                remain_year = 0
                try:
                    remain_year = float(row.get('剩余年限', 0))
                except:
                    continue
                
                # 剩余期限筛选：>1年
                if remain_year <= 1:
                    continue
                
                # 获取正股信息
                stock_name = str(row.get('正股名称', '')).strip()
                stock_code = str(row.get('正股代码', '')).strip()
                
                # 获取债券评级
                credit_rating = str(row.get('债券评级', '')).strip()
                
                # 评级筛选：AA- 以上
                valid_ratings = ['AAA', 'AA+', 'AA', 'AA-']
                if credit_rating not in valid_ratings:
                    continue
                
                # 获取成交额和换手率
                amount = 0
                turnover = 0
                try:
                    amount = float(row.get('成交额', 0))
                    turnover = float(row.get('换手率', 0))
                except:
                    pass
                
                # 获取双低值（价格+溢价率，越低越好）
                double_low = price + premium
                try:
                    double_low = float(row.get('双低', price + premium))
                except:
                    pass
                
                # 计算综合评分
                score = 0
                
                # 价格越低越好 (最高30分)
                price_score = max(0, 30 - (price - 100) * 0.75)
                score += price_score
                
                # 溢价率越低越好 (最高30分)
                premium_score = max(0, 30 - premium)
                score += premium_score
                
                # 剩余期限越长越好 (最高20分)
                year_score = min(20, remain_year * 3.5)
                score += year_score
                
                # 信用评级越高越好 (最高20分)
                rating_scores = {'AAA': 20, 'AA+': 15, 'AA': 10, 'AA-': 5}
                score += rating_scores.get(credit_rating, 0)
                
                result = {
                    'bond_code': bond_code,
                    'bond_name': bond_name,
                    'stock_code': stock_code,
                    'stock_name': stock_name,
                    'price': price,
                    'change_pct': change_pct,
                    'convert_premium': premium,
                    'remain_year': remain_year,
                    'credit_rating': credit_rating,
                    'score': round(score, 2),
                    'amount': amount,
                    'turnover': turnover,
                    'double_low': double_low
                }
                
                results.append(result)
                
            except Exception as e:
                continue
        
        # 按评分排序
        results.sort(key=lambda x: x['score'], reverse=True)
        
        # 取TOP N
        top_bonds = results[:top_n]
        
        print(f"✅ 筛选出 {len(top_bonds)} 只符合条件的可转债")
        print()
        
        return top_bonds
    
    def generate_report(self, bonds: List[Dict]) -> str:
        """生成可转债推荐报告"""
        report = []
        report.append("=" * 60)
        report.append(f"🔷 可转债推荐 (低风险备选)")
        report.append(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append(f"筛选条件: 价格<130元 | 溢价率<30% | 剩余期限>1年 | 评级AA-以上")
        report.append("=" * 60)
        report.append("")
        
        if not bonds:
            report.append("⚠️ 当前市场暂无符合条件的低风险可转债")
            report.append("")
            report.append("建议:")
            report.append("  • 等待市场调整，关注价格回落至130元以下的标的")
            report.append("  • 或考虑国债逆回购、货币基金等低风险理财")
            report.append("")
            return "\n".join(report)
        
        for i, bond in enumerate(bonds, 1):
            report.append(f"【{i}】{bond['bond_name']} ({bond['bond_code']})")
            report.append(f"    正股: {bond['stock_name']} ({bond['stock_code']})")
            report.append(f"    价格: ¥{bond['price']:.2f} ({bond['change_pct']:+.2f}%)")
            report.append(f"    转股溢价率: {bond['convert_premium']:.2f}%")
            report.append(f"    剩余期限: {bond['remain_year']:.2f}年")
            report.append(f"    信用评级: {bond['credit_rating']}")
            report.append(f"    双低值: {bond['double_low']:.2f}")
            report.append(f"    综合评分: {bond['score']:.0f}分")
            report.append("")
            
            # 操作建议
            report.append("    💰 操作建议:")
            if bond['price'] < 105:
                report.append(f"       ✅ 价格低于105元，债性保护极强，适合保守型投资者")
            elif bond['price'] < 110:
                report.append(f"       ✅ 价格低于110元，债性保护强，适合稳健型投资者")
            elif bond['price'] < 120:
                report.append(f"       ✅ 价格适中，攻守平衡，可适量配置")
            else:
                report.append(f"       ⚠️ 价格偏高，注意正股回调风险，轻仓参与")
            
            if bond['convert_premium'] < 10:
                report.append(f"       ✅ 溢价率极低，股性强，跟随正股涨跌")
            elif bond['convert_premium'] < 20:
                report.append(f"       ✅ 溢价率适中，有一定股性")
            else:
                report.append(f"       ✅ 溢价率较高，债性为主，波动较小")
            
            # 小资金建议
            report.append("")
            report.append("    📊 小资金配置建议 (4700元):")
            if bond['price'] < 110:
                report.append(f"       • 可配置 10-20张，约{bond['price']*10:.0f}-{bond['price']*20:.0f}元")
            else:
                report.append(f"       • 可配置 10张，约{bond['price']*10:.0f}元")
            report.append(f"       • T+0交易，当日可买卖")
            report.append(f"       • 下跌有底（纯债价值保护）")
            
            report.append("")
            report.append("-" * 60)
            report.append("")
        
        report.append("⚠️ 风险提示:")
        report.append("   • 可转债虽风险较低，但仍可能跌破面值")
        report.append("   • 正股大幅下跌时，可转债也会跟跌")
        report.append("   • 建议分散配置2-3只，单只不超过总资金30%")
        report.append("   • 关注强赎风险（价格>130元且满足条件时）")
        report.append("")
        
        return "\n".join(report)
    
    def print_report(self, bonds: List[Dict]):
        """打印报告到控制台"""
        report = self.generate_report(bonds)
        print(report)


if __name__ == '__main__':
    selector = BondSelector()
    
    # 筛选2只可转债
    bonds = selector.select_bonds(top_n=2)
    
    # 生成并打印报告
    selector.print_report(bonds)
    
    # 保存到文件
    if bonds:
        report = selector.generate_report(bonds)
        with open('bond_recommendation.txt', 'w', encoding='utf-8') as f:
            f.write(report)
        print("✅ 报告已保存到 bond_recommendation.txt")
